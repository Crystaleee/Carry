package edu.bupt.dmg.action;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
import edu.bupt.dmg.domain.ExerciseRecord;
import edu.bupt.dmg.domain.FoodRecord;
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

	
	@RequestMapping(value = "/updateExeRecord")
	public @ResponseBody Map<String, Object> updateExeRecord(String date, String exercise_category, String exercise_time, String food_category, String food_amount ) throws Exception {
		Subject subject = SecurityUtils.getSubject();
        String userId = subject.getPrincipal().toString();
        Map<String, Object> responseMap = new HashMap<>();
        int EXESUCCESS=1,FOODSUCCESS=1;
        if (userId != null && !"".equals(userId)) {
            // 获取文件集合
            
            if(exercise_category!=null && !"".equals(exercise_category)){
            	if(exercise_time!=null && !"".equals(exercise_time)){
            		//Calendar now = Calendar.getInstance();
            		//String todayDate=(new SimpleDateFormat("yyyy-MM-dd")).format(now.getTime());  
            		ExerciseRecord exerciseRecord=new ExerciseRecord();
            		exerciseRecord.setDate(date);
                    exerciseRecord.setExercise_category(exercise_category);
                    exerciseRecord.setExercise_time(exercise_time);
                    exerciseRecord.setUserID(userId);
                    if(!fileService.createExeRec(exerciseRecord)){
                    	EXESUCCESS=0;
                    }
                  
            	}
            	else
            		EXESUCCESS=0;
            }
            
            if(food_category!=null && !"".equals(food_category)){
            	if(food_amount!=null && !"".equals(food_amount)){
            		FoodRecord foodRecord=new FoodRecord();
                	foodRecord.setDate(date);
                	foodRecord.setFood_category(food_category);
                	foodRecord.setFood_weight(food_amount);
                	foodRecord.setUserID(userId);
                	if(!fileService.createFoodRec(foodRecord)){
                		FOODSUCCESS=0;
                	}	
                	
                }
            	else
            		FOODSUCCESS=0;
            }
            if(EXESUCCESS==1&&FOODSUCCESS==1){
            	responseMap.put("resultMessage", new ResultMessage(1));
            }
            else if(EXESUCCESS==0&&FOODSUCCESS==1)
            	responseMap.put("resultMessage", new ResultMessage(-15));
            else if(EXESUCCESS==1&&FOODSUCCESS==0)
            	responseMap.put("resultMessage", new ResultMessage(-16));
            else
            	responseMap.put("resultMessage", new ResultMessage(-17));
         
        }
        else {
            // 用户未登录数据
            responseMap.put("resultMessage", new ResultMessage(-2));
        }
        return responseMap;
       
	}

}
