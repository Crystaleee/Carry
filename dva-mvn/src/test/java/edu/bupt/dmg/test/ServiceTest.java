package edu.bupt.dmg.test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.google.code.kaptcha.impl.DefaultKaptcha;

import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.service.UserService;
import edu.bupt.dmg.utils.PasswordEncoder;

public class ServiceTest {

	ApplicationContext applicationContext;

	@Before
	public void setUp() throws Exception {
		applicationContext = new ClassPathXmlApplicationContext(
				new String[] { "spring/applicationContext.xml", "spring/applicationContext-*.xml" });
	}

	@Test
	public void loginTest() {
		UserService userService = (UserService) applicationContext.getBean("userService");
		System.out.println(userService.userValidation("stan", "111111"));
	}

	@Test
	public void createUserTest() {
		UserService userService = (UserService) applicationContext.getBean("userService");
		User user = new User();
		user.setUserId("stan2");
		user.setEnabled(true);
		user.setPassword("1111");
		userService.createUser(user);
	}

	@Test
	public void modifyPasswordTest() {
		UserService userService = (UserService) applicationContext.getBean("userService");
		userService.modifyPassword("stan", "1111");
	}

	@Test
	public void userValidateTest() {
		UserService userService = (UserService) applicationContext.getBean("userService");
		userService.userValidation("stan", "1111");
	}

	@Test
	public void encoderTest() {
		System.out.println(PasswordEncoder.encode("1111"));
	}
	
	@Test
	public void getKaptcha() {
		DefaultKaptcha kaptchaProducer = (DefaultKaptcha) applicationContext.getBean("kaptchaProducer");
		System.out.println(kaptchaProducer);
	}
	


}
