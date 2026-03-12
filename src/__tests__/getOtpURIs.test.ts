import { describe, expect, it } from 'vitest';
import { getOtpAuthUris } from '../getOtpURIs';
import {
  Algorithm,
  DigitCount,
  OtpType,
} from '../MigrationPayload';

describe('getOtpAuthUris', () => {
  it('builds OTPAuth URIs for TOTP and HOTP', () => {
    const uris = getOtpAuthUris([
      {
        secret: new Uint8Array([1, 2, 3, 4, 5]),
        name: 'alice@example.com',
        issuer: 'Example',
        algorithm: Algorithm.ALGORITHM_SHA1,
        digits: DigitCount.DIGIT_COUNT_SIX,
        type: OtpType.OTP_TYPE_TOTP,
        counter: 0,
      },
      {
        secret: new Uint8Array([5, 4, 3, 2, 1]),
        name: 'bob@example.com',
        issuer: 'Example',
        algorithm: Algorithm.ALGORITHM_SHA256,
        digits: DigitCount.DIGIT_COUNT_EIGHT,
        type: OtpType.OTP_TYPE_HOTP,
        counter: 42,
      },
    ]);

    expect(uris).toHaveLength(2);
    const totpUri = decodeURIComponent(uris[0]);
    expect(totpUri).toMatch(/^otpauth:\/\/totp\//);
    expect(totpUri).toContain('issuer=Example');
    expect(totpUri).toContain('alice@example.com');

    const hotpUri = decodeURIComponent(uris[1]);
    expect(hotpUri).toMatch(/^otpauth:\/\/hotp\//);
    expect(hotpUri).toContain('issuer=Example');
    expect(hotpUri).toContain('bob@example.com');
    expect(hotpUri).toContain('counter=42');
  });
});
