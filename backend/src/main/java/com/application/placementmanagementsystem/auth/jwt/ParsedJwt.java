package com.application.placementmanagementsystem.auth.jwt;

import com.application.placementmanagementsystem.models.enums.RoleType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;

import javax.crypto.SecretKey;
import java.util.Date;

@AllArgsConstructor
public class ParsedJwt {
    private final Claims claims;
    private final SecretKey secretKey;

    public long getUserId() {
        return Long.parseLong(claims.getSubject());
    }

    public String getEmail() {
        return claims.get("email", String.class);
    }

    public String getName() {
        return claims.get("name", String.class);
    }

    public RoleType getRole() {
        return RoleType.valueOf(claims.get("role", String.class));
    }

    public boolean isExpired() {
        return claims.getExpiration().before(new Date());
    }

    public Date getExpiration() {
        return claims.getExpiration();
    }

    @Override
    public String toString() {
        return Jwts.builder().claims(claims).signWith(secretKey).compact();
    }
}
