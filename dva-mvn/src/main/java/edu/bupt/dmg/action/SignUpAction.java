package edu.bupt.dmg.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.bupt.dmg.commons.ResultMessage;
import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.mail.ActivateMailSendThread;
import edu.bupt.dmg.mail.ActivateMailSender;
import edu.bupt.dmg.service.UserService;
import edu.bupt.dmg.utils.IdGenerator;

/**
 * 注册页面的请求处理
 *
 * Project Name: VisAna<br>
 * File Name: SignUpAction.java<br>
 * Package Name: edu.bupt.dmg.action<br>
 * Creator: @author ruitongChai&bohaoWang<br>    
 * Create Time：2017年10月13日<br>
 * Version: @version 0.0.1
 */
@Controller
@RequestMapping("/signUp")
public class SignUpAction {
	@Autowired
	UserService userService;

	@Autowired
	ActivateMailSender activateMailSender;

	/**
	 * 验证用户是否存在
	 * 
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userNameValidate")
	public @ResponseBody ResultMessage userNameValidate(String userId) throws Exception {
		if (userService.getUserByUserId(userId) == null) {
			return new ResultMessage(1);
		} else {
			return new ResultMessage(-7);
		}
	}

	/**
	 * 验证email是否已经绑定过用户
	 * 
	 * @param email
	 *            邮箱地址
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/emailValidate")
	public @ResponseBody ResultMessage emailValidate(String email) throws Exception {
		if (userService.getUserByEmail(email) == null) {
			return new ResultMessage(1);
		} else {
			return new ResultMessage(-9);
		}
	}

	/**
	 * 注册
	 * 
	 * @param user
	 *            用户注册数据
	 * @param result
	 *            验证结果
	 * @param repeatPassword
	 *            用户注册数据中的多余项
	 * @return Map<String, Object> 包含两个字段1. resultMessage处理结果字段；2.errors错误集合
	 * @throws Exception
	 */
	@RequestMapping(value = "/signUp")
	public @ResponseBody Map<String, Object> signUp(@Valid User user, BindingResult result, String repeatPassword)
			throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// 判断repeatPassword字段是否为空
		if (repeatPassword == null || "".equals(repeatPassword)) {
			result.addError(new FieldError("user", "repeatPassword", "RepeatPassword should not be blank!"));
		}
		// 判断repeatPassword与password字段是否一致
		if (user.getPassword() != null && repeatPassword != null && !repeatPassword.equals(user.getPassword())) {
			// 若不一致则加入错误信息
			result.addError(new FieldError("user", "repeatPassword", "Two password don't equals!"));
		}
		// 判断userId是否已经存在
		if (user != null && userService.getUserByUserId(user.getUserId()) != null) {
			result.addError(new FieldError("user", "userId", "Username Already exists!"));
		}
		// 判断email是否已经存在
		if (user != null && userService.getUserByEmail(user.getEmail()) != null) {
			result.addError(new FieldError("user", "email", "Email Already exists!"));
		}
		// 判断表单验证结果
		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();
			List<FieldError> errors = result.getFieldErrors();
			for (FieldError error : errors) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			resultMap.put("errors", errorMap);
			resultMap.put("resultMessage", new ResultMessage(-8));
		} else {
			// 表单验证通过后，组织用户数据
			user.setAccountNonLocked(true);
			user.setEnabled(false);
			user.setEnableCode(IdGenerator.genGUID());
			// 新增用户
			if (userService.createUser(user)) {
				// 发送验证邮件
				new ActivateMailSendThread(activateMailSender, user).run();
				resultMap.put("resultMessage", new ResultMessage(1));
			} else {
				resultMap.put("resultMessage", new ResultMessage(-8));
			}
		}
		return resultMap;
	}

	/**
	 * 通过邮箱验证激活用户
	 * 
	 * @param userId
	 * @param enableCode
	 *            邮箱验证码
	 * @param response
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/mailActivate")
	public void mailActivate(String userId, String enableCode, HttpServletResponse response, HttpServletRequest request)
			throws Exception {
		if (userId != null && enableCode != null) {
			// 获取用户信息
			User user = userService.getUserByUserId(userId);
			// 判断激活码是否一致
			if (user.getEnableCode().equals(enableCode)) {
				// 激活用户
				if (userService.activateUser(user)) {
					// 重定向至激活成功页面
					response.sendRedirect(request.getContextPath() + "/html/mail_activate_success.html");
				}
			} else {

			}
		}

	}
}
