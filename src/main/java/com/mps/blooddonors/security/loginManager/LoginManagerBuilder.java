package com.mps.blooddonors.security.loginManager;

import com.mps.blooddonors.model.User;
import com.mps.blooddonors.serializers.FacebookAuth;
import com.mps.blooddonors.serializers.GoogleAuth;
import com.mps.blooddonors.service.DirectLoginService;
import com.mps.blooddonors.service.FacebookLoginService;
import com.mps.blooddonors.service.GoogleLoginService;
import com.mps.blooddonors.springContainerUtils.BeanUtil;
import org.springframework.security.authentication.AuthenticationManager;

import javax.servlet.http.HttpServletRequest;


public class LoginManagerBuilder {

    private HttpServletRequest request;
    private AuthenticationManager authenticationManager;

    public LoginManagerBuilder(HttpServletRequest request, AuthenticationManager authenticationManager) {
        this.request = request;
        this.authenticationManager = authenticationManager;
    }


    public LoginManager build() {
        String pathInfo = request.getRequestURI();
        System.out.println("================Build manager==================");
        if ( pathInfo.endsWith("/normal") ) {
            return new LoginManager(request, BeanUtil.getBean(DirectLoginService.class),
                    User.class, authenticationManager);
        } else if (pathInfo.endsWith("/facebook")){
            return new LoginManager(request, BeanUtil.getBean(FacebookLoginService.class),
                    FacebookAuth.class, authenticationManager);
        } else if (pathInfo.endsWith("/google")) {
            return new LoginManager(request, BeanUtil.getBean(GoogleLoginService.class),
                    GoogleAuth.class, authenticationManager);
        }

        return null;

    }


}
