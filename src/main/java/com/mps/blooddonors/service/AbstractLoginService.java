package com.mps.blooddonors.service;

import org.springframework.security.core.userdetails.User;

public abstract class AbstractLoginService {

    public abstract User login(Object o);

}
