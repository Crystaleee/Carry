package edu.bupt.dmg.utils;

import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.HashRequest;
import org.apache.shiro.util.ByteSource;
/**
 * 用户密码加密类
 * 
 * Project Name: VisAna<br> 
 * File Name: PasswordEncoder.java<br> 
 * Package Name: edu.bupt.dmg.utils<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class PasswordEncoder {
	/**
	 * 加密
	 * @param password 用户密码
	 * @return 加密后的用户密码字符串
	 */
	public static String encode(String password) {
		HashRequest request = new HashRequest.Builder().setAlgorithmName("MD5")
				.setSource(ByteSource.Util.bytes(password)).setIterations(1).build();
		DefaultHashService service = new DefaultHashService();
		return service.computeHash(request).toString();
	}

}
