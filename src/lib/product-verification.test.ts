import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyVerificationAttempt,
  classifyStructural,
  countVerification,
  emptyStore,
  selectVerificationBatch,
  telegramPreviewUrl,
  type ListingVerification,
  type VerificationStore,
  type VerificationSubject,
} from "./product-verification";

const SHELL = `<!doctype html><html><script>window.__bbThemeBoot = function () {}</script><div id="app"></div></html>`;

function subject(overrides: Partial<VerificationSubject> = {}): VerificationSubject {
  return {
    listingId: "weidian:7674877692",
    platform: "weidian",
    listingNumericId: "7674877692",
    destinationUrl: "https://boonbuy.com/product/weidian/7674877692?inviteCode=JOINUP",
    imageEvidence: "unchecked",
    qcUrl: "",
    ...overrides,
  };
}

function http(body: string, httpStatus = 200, contentType = "text/html"): { kind: "http"; httpStatus: number; contentType: string; body: string } {
  return { kind: "http", httpStatus, contentType, body };
}

describe("product verification", () => {
  it("does not treat the BoonBuy app shell as verified", () => {
    const structural = classifyStructural(subject());
    assert.equal(structural.destination_status, "UNKNOWN");
    assert.equal(structural.destination.code, "destination_shell_rule");
    assert.equal(structural.verification_state, "UNKNOWN");
    assert.equal(structural.last_checked_at, null);

    const real = applyVerificationAttempt({
      previous: structural,
      subject: subject(),
      observations: { destinationHtml: http(SHELL) },
      now: "2026-11-22T23:10:00.000Z",
    });
    const fake = applyVerificationAttempt({
      previous: structural,
      subject: subject({ listingId: "weidian:1", listingNumericId: "1", destinationUrl: "https://boonbuy.com/product/weidian/1" }),
      observations: { destinationHtml: http(SHELL) },
      now: "2026-11-22T23:10:00.000Z",
    });
    assert.equal(real.record.destination_status, "UNKNOWN");
    assert.equal(real.record.destination.code, "destination_shell");
    assert.equal(fake.record.destination_status, "UNKNOWN");
    assert.equal(real.record.verification_state, "UNKNOWN");
    assert.equal(fake.record.verification_state, "UNKNOWN");
  });

  it("verifies the destination only when profile JSON names this listing", () => {
    const profile = JSON.stringify({
      success: true,
      result: { spuNo: "7674877692", subject: "M Cold hat-SS", channel: "WEIDIAN" },
    });
    const verified = applyVerificationAttempt({
      previous: classifyStructural(subject({ imageEvidence: "hosted" })),
      subject: subject({ imageEvidence: "hosted" }),
      observations: {
        destinationProfile: http(profile, 200, "application/json"),
        source: http(`&#34;item_id&#34;:&#34;7674877692&#34;,&#34;item_name&#34;:&#34;M Cold hat-SS&#34;`),
      },
      now: "2026-11-22T23:12:00.000Z",
    });
    assert.equal(verified.record.destination_status, "VERIFIED");
    assert.equal(verified.record.destination.code, "destination_profile");
    assert.equal(verified.record.source_status, "VERIFIED");
    assert.equal(verified.record.verification_state, "VERIFIED");

    const other = applyVerificationAttempt({
      previous: classifyStructural(subject()),
      subject: subject(),
      observations: {
        destinationProfile: http(
          JSON.stringify({ success: true, result: { spuNo: "1", subject: "Other", channel: "WEIDIAN" } }),
          200,
          "application/json"
        ),
      },
      now: "2026-11-22T23:12:00.000Z",
    });
    assert.equal(other.record.destination_status, "UNKNOWN");
    assert.equal(other.record.destination.code, "destination_mismatch");
    assert.equal(other.record.verification_state, "UNKNOWN");

    const failed = applyVerificationAttempt({
      previous: classifyStructural(subject()),
      subject: subject(),
      observations: {
        destinationProfile: http(JSON.stringify({ success: false, code: 500, result: null, message: "查询商品详情失败" }), 200, "application/json"),
      },
      now: "2026-11-22T23:12:00.000Z",
    });
    assert.equal(failed.record.verification_state, "UNKNOWN");
    assert.equal(failed.record.destination.code, "destination_api_unproven");
  });

  it("verifies a Weidian item record without verifying the product", () => {
    const live = applyVerificationAttempt({
      previous: classifyStructural(subject()),
      subject: subject(),
      observations: {
        source: http(`&#34;item_id&#34;:&#34;7674877692&#34;,&#34;item_name&#34;:&#34;M Cold hat-SS&#34;`),
      },
      now: "2026-11-22T23:14:00.000Z",
    });
    assert.equal(live.record.source_status, "VERIFIED");
    assert.equal(live.record.source.code, "source_item_record");
    assert.equal(live.record.verification_state, "UNKNOWN");

    const missing = applyVerificationAttempt({
      previous: classifyStructural(subject({ listingNumericId: "1", listingId: "weidian:1" })),
      subject: subject({ listingNumericId: "1", listingId: "weidian:1" }),
      observations: { source: http("<title>商品详情</title>") },
      now: "2026-11-22T23:14:00.000Z",
    });
    assert.equal(missing.record.source_status, "UNKNOWN");
    assert.equal(missing.record.source.code, "source_unproven");
    assert.notEqual(missing.record.verification_state, "BROKEN");
  });

  it("marks confirmed HTTP failures broken and keeps challenges for retry", () => {
    const gone = applyVerificationAttempt({
      previous: classifyStructural(subject()),
      subject: subject(),
      observations: { source: http("", 404) },
      now: "2026-11-22T23:16:00.000Z",
    });
    assert.equal(gone.record.source_status, "BROKEN");
    assert.equal(gone.record.source.code, "source_http_404");
    assert.equal(gone.record.verification_state, "BROKEN");

    const image = applyVerificationAttempt({
      previous: classifyStructural(subject({ imageEvidence: "prior_dead" })),
      subject: subject({ imageEvidence: "prior_dead" }),
      observations: { image: http("", 410, "text/plain") },
      now: "2026-11-22T23:16:00.000Z",
    });
    assert.equal(image.record.image_status, "BROKEN");
    assert.equal(image.record.image.code, "image_http_410");
    assert.equal(image.record.verification_state, "BROKEN");

    const previous = classifyStructural(subject());
    previous.source = { status: "VERIFIED", code: "source_item_record", checked_at: "2026-11-21T00:00:00.000Z", http_status: 200 };
    previous.source_status = "VERIFIED";
    const challenged = applyVerificationAttempt({
      previous,
      subject: subject(),
      observations: {
        destinationProfile: http("<title>Just a moment...</title><script src='https://challenges.cloudflare.com/turnstile'></script>", 403),
      },
      now: "2026-11-22T23:16:00.000Z",
    });
    assert.equal(challenged.transient.includes("destination"), true);
    assert.equal(challenged.record.source_status, "VERIFIED");
    assert.equal(challenged.record.destination_status, "UNKNOWN");
    assert.equal(challenged.record.destination.checked_at, null);
    assert.equal(challenged.record.last_checked_at, null);
    assert.equal(challenged.record.last_attempt_at, "2026-11-22T23:16:00.000Z");

    const blockedProfile = applyVerificationAttempt({
      previous: classifyStructural(subject()),
      subject: subject(),
      observations: {
        destinationProfile: http("<html>blocked</html>", 403),
        destinationHtml: http(SHELL),
      },
      now: "2026-11-22T23:16:30.000Z",
    });
    assert.equal(blockedProfile.record.destination_status, "UNKNOWN");
    assert.equal(blockedProfile.record.destination.code, "destination_shell");
    assert.equal(blockedProfile.record.destination.http_status, 200);
    assert.equal(blockedProfile.transient.includes("destination"), false);
  });

  it("classifies an invalid source and a hosted image without a fetch time", () => {
    const broken = classifyStructural(subject({
      listingId: "row:9",
      platform: null,
      listingNumericId: null,
      destinationUrl: "https://boonbuy.com/register?inviteCode=JOINUP",
      imageEvidence: "missing",
    }));
    assert.equal(broken.source_status, "BROKEN");
    assert.equal(broken.source.code, "invalid_source");
    assert.equal(broken.destination_status, "BROKEN");
    assert.equal(broken.image_status, "BROKEN");
    assert.equal(broken.verification_state, "BROKEN");
    assert.equal(broken.last_checked_at, null);

    const hosted = classifyStructural(subject({ imageEvidence: "hosted" }));
    assert.equal(hosted.image_status, "VERIFIED");
    assert.equal(hosted.image.code, "image_hosted");
    assert.equal(hosted.verification_state, "UNKNOWN");
  });

  it("verifies a Telegram QC post only when the preview names that post", () => {
    const qcUrl = "https://t.me/cnfansOfficialChannel/21759";
    assert.equal(telegramPreviewUrl(qcUrl), "https://t.me/s/cnfansOfficialChannel/21759");
    const present = applyVerificationAttempt({
      previous: classifyStructural(subject({ qcUrl })),
      subject: subject({ qcUrl }),
      observations: { qc: http(`<div data-post="cnfansOfficialChannel/21759"></div>`) },
      now: "2026-11-22T23:18:00.000Z",
    });
    assert.equal(present.record.qc_status, "VERIFIED");
    assert.equal(present.record.qc.code, "qc_post");
    assert.equal(present.record.verification_state, "UNKNOWN");

    const absent = applyVerificationAttempt({
      previous: classifyStructural(subject({ qcUrl })),
      subject: subject({ qcUrl }),
      observations: { qc: http(`<div data-post="cnfansOfficialChannel/51267"></div>`) },
      now: "2026-11-22T23:18:00.000Z",
    });
    assert.equal(absent.record.qc_status, "UNKNOWN");
    assert.equal(absent.record.qc.code, "qc_unproven");
    assert.notEqual(absent.record.qc_status, "BROKEN");
  });

  it("checks the oldest listing first and skips a recent transient attempt", () => {
    const store: VerificationStore = emptyStore();
    const older: ListingVerification = classifyStructural(subject({ listingId: "weidian:1", listingNumericId: "1" }));
    older.last_checked_at = "2026-11-20T00:00:00.000Z";
    older.source.checked_at = older.last_checked_at;
    older.image.checked_at = older.last_checked_at;
    older.destination.checked_at = older.last_checked_at;
    older.qc.checked_at = older.last_checked_at;
    const newer = classifyStructural(subject());
    newer.last_checked_at = "2026-11-22T00:00:00.000Z";
    newer.source.checked_at = newer.last_checked_at;
    newer.image.checked_at = newer.last_checked_at;
    newer.destination.checked_at = newer.last_checked_at;
    newer.qc.checked_at = newer.last_checked_at;
    const cooling = classifyStructural(subject({ listingId: "weidian:3", listingNumericId: "3" }));
    cooling.last_attempt_at = "2026-11-22T22:00:00.000Z";
    store.listings[older.listingId] = older;
    store.listings[newer.listingId] = newer;
    store.listings[cooling.listingId] = cooling;

    const batch = selectVerificationBatch({
      listingIds: [newer.listingId, cooling.listingId, older.listingId, "weidian:4"],
      store,
      nowMs: Date.parse("2026-11-22T23:00:00.000Z"),
      limit: 2,
      cooldownMs: 6 * 60 * 60 * 1000,
    });
    assert.deepEqual(batch, ["weidian:4", "weidian:1"]);
  });

  it("keeps the same permanent result when the same response is applied again", () => {
    const observations = {
      source: http(`"item_id":"7674877692","item_name":"Hat"`),
      destinationHtml: http(SHELL),
      image: http("", 200, "image/jpeg"),
    };
    const first = applyVerificationAttempt({
      previous: classifyStructural(subject()),
      subject: subject(),
      observations,
      now: "2026-11-22T23:20:00.000Z",
    });
    const second = applyVerificationAttempt({
      previous: first.record,
      subject: subject(),
      observations,
      now: "2026-11-23T23:20:00.000Z",
    });
    assert.equal(second.record.source_status, first.record.source_status);
    assert.equal(second.record.source.code, first.record.source.code);
    assert.equal(second.record.destination.code, "destination_shell");
    assert.equal(second.record.image.code, "image_bytes");
    assert.equal(second.record.verification_state, "UNKNOWN");
    assert.equal(second.record.last_checked_at, "2026-11-23T23:20:00.000Z");
    const counts = countVerification({ listings: { [second.record.listingId]: second.record } });
    assert.equal(counts.verified, 0);
    assert.equal(counts.unknown, 1);
    assert.equal(counts.sourceVerified, 1);
  });
});
