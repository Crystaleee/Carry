package edu.bupt.dmg.action;

import java.util.HashMap;
import java.util.Map;

import javax.enterprise.inject.New;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.PrincipalCollection;
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
import edu.bupt.dmg.service.UserService;


import org.apache.shiro.authc.LogoutAware;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.CacheManagerAware;
import org.apache.shiro.mgt.RealmSecurityManager;
import org.apache.shiro.realm.CachingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.CollectionUtils;
import org.apache.shiro.util.Nameable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Collection;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 处理用户请求
 * 
 * Project Name: VisAna<br>
 * File Name: UserAction.java<br>
 * Package Name: edu.bupt.dmg.action<br>
 * Creator: @author ruitongChai&bohaoWang<br>    
 * Create Time：2017年10月13日<br>
 * Version: @version 0.0.1
 */
@Controller
@RequestMapping("/user")
public class UserAction {
	private static final Logger logger = LoggerFactory.getLogger(UserAction.class);

	@Autowired
	UserService userService;

	@Autowired
	UserRealm userRealm;
	/**
	 * 登录请求
	 * 
	 * @param user
	 *            用户
	 * @param rememberme
	 *            是否记住用户
	 * @param kaptcha
	 *            验证码
	 * @return ResultMessage结果信息
	 * @throws Exception
	 */
	@RequestMapping(value = "/login")
	public @ResponseBody ResultMessage login(User user, Boolean rememberme, String kaptcha) throws Exception {
		// 获取验证码真值
		Subject subject = SecurityUtils.getSubject();
		String kaptchaCode = (String) subject.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
		// 判断提交的验证码值与真值是否一致
		if (kaptcha.equals(kaptchaCode)) {
			// 验证用户
			if (userService.userValidation(user.getUserId().trim(), user.getPassword().trim())) {
				// 将认证信息交给shiro管理
				UsernamePasswordToken token = new UsernamePasswordToken(user.getUserId(), user.getPassword());
				token.setRememberMe(rememberme);
				subject.login(token);
				logger.info("user " + user.getUserId() + " has logged in!");
				return new ResultMessage(1);
			} else {
				return new ResultMessage(-1);
			}
		} else {
			return new ResultMessage(-5);
		}
	}
	@RequestMapping(value = "/haslogin")
	public @ResponseBody Map<String, Object> haslogin() throws Exception {
		// 获取验证码真值
		System.out.println("what????????");
		Subject subject = SecurityUtils.getSubject();
		Map<String, Object>responseMap=new HashMap<>();
        try {
        		String userid=subject.getPrincipal().toString();
        		if(userid !=null && !"".equals(userid)) {
        			responseMap.put("resultMessage",new ResultMessage(1));
        		}
        		else {
        			responseMap.put("resultMessage",new ResultMessage(-2));
        		}
        		
        }
        catch (Exception e) {
        		responseMap.put("resultMessage",new ResultMessage(-2));
		}
        return responseMap;
	
		
		
	}

	/**
	 * 注销登陆
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 将用户从shiro中注销
		System.out.println("6666666666666666666666");
		Subject subject = SecurityUtils.getSubject();
		
		//PrincipalCollection principals =subject.getPrincipals();
//		RealmSecurityManager securityManager =  
//			     (RealmSecurityManager) SecurityUtils.getSecurityManager();  
//		UserRealm userRealm = (UserRealm) securityManager.getRealms().iterator().next();  
//	    userRealm.clearCachedAuthenticationInfo(subject.getPrincipals());  
//		subject.
		userRealm.clearCached(subject);
	    subject.logout();
	    System.out.println("biubiubiubiu");
		// 重定向至登录页面
		response.sendRedirect(request.getContextPath());
//		response.setDateHeader("Expires",0);
//		response.setHeader("Cache-Control","no-cache");
//		response.setHeader("Pragma","no-cache");
	}

}
