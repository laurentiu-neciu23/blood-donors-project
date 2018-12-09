package com.mps.blooddonors.serializers;

public class SimpleResponse {

    private String mesage;

    public SimpleResponse(String mesage) {
        this.mesage = mesage;
    }


    public String getMesage() {
        return mesage;
    }

    public void setMesage(String mesage) {
        this.mesage = mesage;
    }
}
