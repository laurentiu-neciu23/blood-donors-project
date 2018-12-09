package com.mps.blooddonors.communicator.google;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;

public class GoogleDetailsCommunicator {

    private JSONObject httpResponseJsonObject = null;
    private String authToken = null;
    final private String profileEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";


    public GoogleDetailsCommunicator(String authToken) {
        this.authToken = authToken;
        httpResponseJsonObject = fetchHttpResponse();
    }

    public String getFirstName() {
        if(httpResponseJsonObject != null) {
            return httpResponseJsonObject.getString("given_name");
        }
        return null;
    }

    public String getLastName() {
        if(httpResponseJsonObject != null){
            return httpResponseJsonObject.getString("family_name");
        }
        return null;
    }

    public String getEmail() {
        if (httpResponseJsonObject != null) {
            return httpResponseJsonObject.getString("email");
        }
        return null;
    }

    private JSONObject fetchHttpResponse() {
        HttpResponse<JsonNode> response = null;
        try {
            response = Unirest.get(profileEndpoint)
                    .header("content-type", "application/json")
                    .header("Authorization", "Bearer " + authToken)
                    .asJson();
            return response.getBody().getObject();

        } catch (UnirestException e) {
            return null;
        }
    }

}
