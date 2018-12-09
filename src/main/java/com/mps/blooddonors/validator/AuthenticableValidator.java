package com.mps.blooddonors.validator;


import com.mps.blooddonors.springContainerUtils.BeanUtil;
import org.apache.commons.beanutils.BeanUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.Objects;

public class AuthenticableValidator implements ConstraintValidator<Authenticable, Object> {

    private String password;
    private String[] authTokens;
    private String adminTouched;
    private int passwordSize;

    @Override
    public void initialize(final Authenticable authenticable) {
        this.password = authenticable.password();
        this.authTokens = authenticable.authTokens();
        this.passwordSize = authenticable.passwordSize();
        this.adminTouched = authenticable.adminTouchPropertyName();
    }


    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {

        System.out.println(fetchProp(value, adminTouched));

        if(Objects.equals(fetchProp(value, adminTouched), "true")) {
            setProp(value, adminTouched, false);
            return true;
        }

        boolean isAnywhereForeignAuthorized;
        isAnywhereForeignAuthorized = Arrays.stream(authTokens)
                .map(propertyName -> fetchProp(value, propertyName)).anyMatch(Objects::nonNull);

        if(!isAnywhereForeignAuthorized) {
            String passwordValue = fetchProp(value, password);
            if(passwordValue == null) return false;
            return passwordValue.length() >= passwordSize;
        }

        return true;
    }



    private String fetchProp(Object value, String propertyName) {
        try {
            return BeanUtils.getProperty(value, propertyName);
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            return null;
        }
    }

    private void setProp(Object obj, String propertyName, Object value) {
        try {
            BeanUtils.setProperty(obj, propertyName, false);
        } catch (IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
    }
}
