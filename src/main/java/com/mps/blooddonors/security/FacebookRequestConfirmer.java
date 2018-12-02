package com.mps.blooddonors.security;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.GetRequest;
import com.mps.blooddonors.serializers.FacebookAuth;
import com.mashape.unirest.*;

import static com.mps.blooddonors.security.SecurityConstants.*;


public class FacebookRequestConfirmer {

    FacebookAuth facebookAuth;


    public FacebookRequestConfirmer(FacebookAuth facebookAuth) {
        this.facebookAuth = facebookAuth;
    }




    public boolean isGenuine() {
        String url = "https://graph.facebook.com/v3.2/oauth/access_token?"
                                              + "client_id=" + SecurityConstants.CLIENT_ID
                                              + "&redirect_uri=" + SecurityConstants.FRONTEND_HOST
                                              + "&client_secret=" + SecurityConstants.SECRET_FACEBOOK_ID
                                              + "&code=" + facebookAuth.getCode();

        HttpResponse<JsonNode> response = null;
        try {
            response = Unirest.get(url)
                    .header("content-type", "application/json")
                    .asJson();
            JsonNode jsonRoot = response.getBody();
            String accessToken = jsonRoot.getObject().getString("access_token");

        } catch (UnirestException e) {
            return false;
        }

        return false;


    }


}