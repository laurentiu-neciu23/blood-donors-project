package com.mps.blooddonors.communicator.facebook;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mps.blooddonors.security.SecurityConstants;
import com.mps.blooddonors.serializers.FacebookAuth;

public class FacebookOAuthCommunicator {

    private final static String baseOauthUrl = "https://graph.facebook.com/v3.2/oauth/access_token?";
    private String authToken;
    private FacebookAuth facebookAuth;

    public FacebookOAuthCommunicator(FacebookAuth facebookAuth) {
        this.facebookAuth = facebookAuth;
        this.authToken = fetchAuthToken();
    }

    public boolean isGeniuine() {
        return this.authToken != null;
    }

    public String getAuthToken() {
        return authToken;
    }


    private String fetchAuthToken() {

        HttpResponse<JsonNode> response = null;
        try {
            response = Unirest.get(fetchUrlOAuthEndpoint())
                    .header("content-type", "application/json")
                    .asJson();
            JsonNode jsonRoot = response.getBody();
            return jsonRoot.getObject().getString("access_token");

        } catch (UnirestException e) {
            return null;
        }
    }

    private String fetchUrlOAuthEndpoint() {

        return baseOauthUrl
                + "client_id=" + SecurityConstants.CLIENT_ID
                + "&redirect_uri=" + SecurityConstants.FRONTEND_HOST
                + "&client_secret=" + SecurityConstants.SECRET_FACEBOOK_ID
                + "&code=" + facebookAuth.getCode();
    }

}
