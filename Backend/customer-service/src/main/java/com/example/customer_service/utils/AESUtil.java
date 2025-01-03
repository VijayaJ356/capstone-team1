package com.example.customer_service.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AESUtil {
    private static final String AES = "AES";

    // Adjusts the key length to 16 bytes for AES-128 encryption
    private static String adjustKey(String key) {
        if (key.length() < 16) {
            return String.format("%-16s", key).substring(0, 16); // Pad with spaces to 16 bytes
        } else if (key.length() > 16) {
            return key.substring(0, 16); // Truncate to 16 bytes
        }
        return key;
    }

    public static String encrypt(String plainText, String secretKey) throws Exception {
        String adjustedKey = adjustKey(secretKey);
        SecretKeySpec keySpec = new SecretKeySpec(adjustedKey.getBytes(), AES);
        Cipher cipher = Cipher.getInstance(AES);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public static String decrypt(String encryptedText, String secretKey) throws Exception {
        String adjustedKey = adjustKey(secretKey);
        SecretKeySpec keySpec = new SecretKeySpec(adjustedKey.getBytes(), AES);
        Cipher cipher = Cipher.getInstance(AES);
        cipher.init(Cipher.DECRYPT_MODE, keySpec);
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedText);
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
        return new String(decryptedBytes);
    }
}





