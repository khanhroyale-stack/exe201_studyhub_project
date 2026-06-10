package com.management.studyhub.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EkycApiService {

    private final String API_KEY = "SVXWp0lSG8gJNtjbsld4xTE7OBb_Cycn";
    private final String API_SECRET = "4913jAGF8Jq37TOOmNb592p7EezmGJhy";
    private final String FACEPP_COMPARE_URL = "https://api-us.faceplusplus.com/facepp/v3/compare";

    private final RestTemplate restTemplate = new RestTemplate();

    public BigDecimal compareFaces(String avatarUrl, String idCardUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("api_key", API_KEY);
            body.add("api_secret", API_SECRET);
            body.add("image_url1", avatarUrl);
            body.add("image_url2", idCardUrl);

            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(FACEPP_COMPARE_URL, requestEntity, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody.containsKey("confidence")) {
                    Object confidenceObj = responseBody.get("confidence");
                    if (confidenceObj instanceof Number) {
                        return BigDecimal.valueOf(((Number) confidenceObj).doubleValue());
                    } else if (confidenceObj instanceof String) {
                        return new BigDecimal((String) confidenceObj);
                    }
                } else if (responseBody.containsKey("error_message")) {
                    log.error("Face++ API Error: {}", responseBody.get("error_message"));
                    return null; // Return null if API returns an error message like face not found
                }
            }
            return null;

        } catch (Exception e) {
            log.error("Error calling Face++ API: ", e);
            return null;
        }
    }
}
