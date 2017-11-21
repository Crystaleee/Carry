package edu.bupt.dmg.realm;

import java.util.HashSet;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import edu.bupt.dmg.domain.Authority;
import edu.bupt.dmg.domain.Role;
import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.service.UserService;
/**
 * 用户权限验证，shiro要求的验证实现
 * 
 * Project Name: VisAna<br> 
 * File Name: UserRealm.java<br> 
 * Package Name: edu.bupt.dmg.realm<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class UserRealm extends AuthorizingRealm {

	@Autowired
	private UserService userService;

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String userId = (String) principals.getPrimaryPrincipal();
		User user = userService.getUserByUserId(userId);
		Set<String> roles = new HashSet<>();
		Set<String> authorities = new HashSet<>();
		for (Role role : user.getRoles()) {
			roles.add(role.getRoleName());
			for (Authority authority : role.getAuthorities()) {
				authorities.add(authority.getAuthorityName());
			}
		}
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		authorizationInfo.setRoles(roles);
		authorizationInfo.setStringPermissions(authorities);
		return authorizationInfo;
	}
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String userId = ((UsernamePasswordToken) token).getUsername().trim();
		User user = userService.getUserByUserId(userId);

		if (user == null) {
			throw new UnknownAccountException();// 没找到帐号
		} else if (!user.isAccountNonLocked()) {
			throw new LockedAccountException(); // 帐号锁定
		}

		// 交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(userId, user.getPassword(),
				getName());
		return authenticationInfo;
	}

}
