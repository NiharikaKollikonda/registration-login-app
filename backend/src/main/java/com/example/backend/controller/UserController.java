
package com.example.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public Map<String, String> getCurrentUser(
            @AuthenticationPrincipal Jwt jwt) {

        return Map.of(
                "message", "You accessed a protected endpoint!",
                "email", jwt.getSubject()
        );
    }
}
