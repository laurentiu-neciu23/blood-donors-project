package com.mps.blooddonors.communicator.google;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mps.blooddonors.security.SecurityConstants;
import com.mps.blooddonors.serializers.FacebookAuth;
import com.mps.blooddonors.serializers.GoogleAuth;

public class GoogleOAuthCommunicator {


    final static String baseOauthUrl = "https://www.googleapis.com/oauth2/v4/token?";
    private String authToken;
    private GoogleAuth googleAuth;


    public GoogleOAuthCommunicator(GoogleAuth googleAuth) {
        this.googleAuth = googleAuth;
        this.authToken = fetchAuthToken();
    }

    public boolean isGeniuine() {
        if(this.authToken == null) {
            return false;
        }
        return true;
    }

    public String getAuthToken() {
        return authToken;
    }




    private String fetchAuthToken() {

        HttpResponse<JsonNode> response = null;
        try {
            response = Unirest.post(fetchPayload())
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .asJson();
            JsonNode jsonRoot = response.getBody();
            String accessToken = jsonRoot.getObject().getString("access_token");
            return accessToken;

        } catch (UnirestException e) {
            return null;
        }
    }

    private String fetchPayload() {
        String payload = baseOauthUrl
                + "client_id=" + SecurityConstants.GOOGLE_CLIENT_ID
                + "&redirect_uri=" + "http://localhost:3000"
                + "&client_secret=" + SecurityConstants.SECRET_GOOGLE_ID
                + "&code=" + googleAuth.getCode()
                + "&grant_type=authorization_code";

        return payload;
    }



}
