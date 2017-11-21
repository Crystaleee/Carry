package edu.bupt.dmg.action.exception;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 异常处理
 * 
 * Project Name: VisAna<br>
 * File Name: ExceptionHandlerController.java<br>
 * Package Name: edu.bupt.dmg.action.exception<br>
* Creator: @author ruitongChai&bohaoWang<br>    
 * Create Time：2017年10月13日<br>
 * Version: @version 0.0.1
 */
@ControllerAdvice
public class ExceptionHandlerController {

	/**
	 * 权限异常处理
	 * 
	 * @param ex
	 * @param response
	 */
	@ExceptionHandler(value = { org.apache.shiro.authz.UnauthorizedException.class })
	public void unauthorizedExceptionHandler(Exception ex, HttpServletResponse response) {
		// 若接收到权限处理异常，则向用户发送403错误
		try {
			response.sendError(403);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@ExceptionHandler(value = { org.apache.shiro.authz.UnauthenticatedException.class })
	public void unauthenticatedExceptionHandler(Exception ex, HttpServletResponse response) {
		// 若接收到未认证异常，则向用户发送401错误
		try {
			response.sendError(401);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}