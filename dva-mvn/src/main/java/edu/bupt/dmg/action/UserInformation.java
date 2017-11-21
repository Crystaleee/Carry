package edu.bupt.dmg.action;
import java.util.HashMap;
import java.util.Map;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.code.kaptcha.Constants;

import edu.bupt.dmg.commons.ResultMessage;
import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.realm.UserRealm;
import edu.bupt.dmg.service.FileService;
import edu.bupt.dmg.service.UserService;

@Controller
@RequestMapping("/UserInformation")

public class UserInformation {
	@Autowired
	UserService userService;

	@Autowired
	FileService fileService;
	
	@Autowired
	UserRealm userRealm;


}
