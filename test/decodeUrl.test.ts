import protobuf from 'protobufjs';
import { describe, expect, it } from 'vitest';
import { decodeMigrationUrl } from '../src/decodeUrl';
import {
  Algorithm,
  DigitCount,
  OtpType,
} from '../src/MigrationPayload';
import { MigrationPayloadMessageProto } from '../src/MigrationPayloadMessage';

function buildMigrationUrl() {
  const { root } = protobuf.parse(MigrationPayloadMessageProto);
  const MigrationPayloadMsg = root.lookupType('MigrationPayload');
  const message = MigrationPayloadMsg.create({
    otpParameters: [
      {
        secret: new Uint8Array([1, 2, 3, 4, 5]),
        name: 'alice@example.com',
        issuer: 'Example',
        algorithm: Algorithm.ALGORITHM_SHA1,
        digits: DigitCount.DIGIT_COUNT_SIX,
        type: OtpType.OTP_TYPE_TOTP,
        counter: 0,
      },
    ],
    version: 1,
    batchSize: 1,
    batchIndex: 0,
    batchId: 42,
  });

  const buffer = MigrationPayloadMsg.encode(message).finish();
  const data = Buffer.from(buffer).toString('base64');
  return `otpauth-migration://offline?data=${encodeURIComponent(data)}`;
}

describe('decodeMigrationUrl', () => {
  it('decodes a migration URL payload', () => {
    const decoded = decodeMigrationUrl(buildMigrationUrl());

    expect(decoded.batchId).toBe(42);
    expect(decoded.otpParameters).toHaveLength(1);
    expect(decoded.otpParameters[0].issuer).toBe('Example');
    expect(decoded.otpParameters[0].name).toBe('alice@example.com');
    expect(decoded.otpParameters[0].type).toBe(OtpType.OTP_TYPE_TOTP);
  });
});
