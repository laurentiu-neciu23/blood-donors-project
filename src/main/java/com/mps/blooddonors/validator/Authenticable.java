package com.mps.blooddonors.validator;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.ANNOTATION_TYPE, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AuthenticableValidator.class)
public @interface Authenticable {

    String message() default "{constraints.authenticable}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    /**
     *
     * @return The password of the authenticable object.
     */
    String password();

    /**
     *
     * @return A list of additional authentication tokens.
     */
    String[] authTokens();

    /**
     *
     * @return The size of required password if not authenticated anywhere foreign.
     */
    int passwordSize() default 6;

    /**
     *
     * @return The admin touched property name for validation skipping
     */

    String adminTouchPropertyName();

}
