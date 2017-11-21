package edu.bupt.dmg.test;

import java.util.Properties;

import javax.mail.internet.MimeMessage;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.mail.ActivateMailSender;
import edu.bupt.dmg.service.UserService;

public class MailTest {
	private ApplicationContext applicationContext;

	@Before
	public void setUp() throws Exception {
		applicationContext = new ClassPathXmlApplicationContext(
				new String[] { "spring/applicationContext.xml", "spring/applicationContext-*.xml" });
	}

	@Test
	public void sendmailTest() {
		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();

		// 璁惧畾mail server
		senderImpl.setHost("smtp.126.com");

		// 寤虹珛閭欢娑堟伅,鍙戦�绠�崟閭欢鍜宧tml閭欢鐨勫尯鍒�
		MimeMessage mailMessage = senderImpl.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(mailMessage);
		try {
			messageHelper.setTo("chenpudigege@126.com");
			messageHelper.setFrom("chenpudigege@126.com");
			messageHelper.setSubject("娴嬭瘯HTML閭欢锛�");
			// true 琛ㄧず鍚姩HTML鏍煎紡鐨勯偖浠�
			messageHelper.setText("<html><head></head><body><h1>hello!!spring html Mail</h1></body></html>", true);

		} catch (Exception e) {
			// TODO: handle exception
		}
		// 璁剧疆鏀朵欢浜猴紝瀵勪欢浜�

		senderImpl.setUsername("chenpudigege@126.com"); // 鏍规嵁鑷繁鐨勬儏鍐�璁剧疆username
		senderImpl.setPassword("cpd123456"); // 鏍规嵁鑷繁鐨勬儏鍐� 璁剧疆password
		Properties prop = new Properties();
		prop.put("mail.smtp.auth", "true"); // 灏嗚繖涓弬鏁拌涓簍rue锛岃鏈嶅姟鍣ㄨ繘琛岃璇�璁よ瘉鐢ㄦ埛鍚嶅拰瀵嗙爜鏄惁姝ｇ‘
		prop.put("mail.smtp.timeout", "25000");
		senderImpl.setJavaMailProperties(prop);
		// 鍙戦�閭欢
		senderImpl.send(mailMessage);

		System.out.println("閭欢鍙戦�鎴愬姛..");
	}

	@Test
	public void sendmailTest2() {
		ActivateMailSender mailSender = (ActivateMailSender) applicationContext.getBean("activateMailSender");
		UserService userService=(UserService)applicationContext.getBean("userService");
		User user = userService.getUserByUserId("Ruitong Chai & Bohao Wang");
		try {
			mailSender.send(user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
