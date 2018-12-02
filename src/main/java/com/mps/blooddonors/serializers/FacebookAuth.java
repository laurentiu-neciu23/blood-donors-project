package com.mps.blooddonors.serializers;

public class FacebookAuth {

    private String state;
    private String code;

    /**
     * @return the state
     */
    public String getState() {
        return state;
    }

    /**
     * @return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * @param code the code to set
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * @param state the state to set
     */
    public void setState(String state) {
        this.state = state;
    }


}
