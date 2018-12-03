package com.mps.blooddonors.comunicator.facebook;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;

public class FacebookDetailsCommunicator {

    private JSONObject httpResponseJsonObject = null;
    private String authToken = null;
    final private String urlBase = "https://graph.facebook.com/me?";


    public FacebookDetailsCommunicator(String authToken) {
        this.authToken = authToken;
        httpResponseJsonObject = fetchHttpResponse();
    }



    public String getFirstName() {
        if(httpResponseJsonObject != null) {
            return httpResponseJsonObject.getString("first_name");
        }

        return null;
    }


    public String getLastName() {
        if(httpResponseJsonObject != null){
            return httpResponseJsonObject.getString("last_name");
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
            response = Unirest.get(fetchUrl())
                    .header("content-type", "application/json")
                    .asJson();
            return response.getBody().getObject();

        } catch (UnirestException e) {
            return null;
        }
    }

    private String fetchUrl() {
        String url = urlBase
                + "fields=email,first_name,last_name"
                + "&access_token="
                + authToken;

        return url;
    }



}
