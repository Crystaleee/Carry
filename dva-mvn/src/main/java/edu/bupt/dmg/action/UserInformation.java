package edu.bupt.dmg.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;

import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import edu.bupt.dmg.commons.ResultMessage;
import edu.bupt.dmg.domain.ExerciseRecord;
import edu.bupt.dmg.domain.FoodRecord;

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

	
	@RequestMapping(value = "/uploadRecord")
	public @ResponseBody Map<String, Object> uploadRecord(String date, String exercise_category, String exercise_time, String food_category, String food_amount ) throws Exception {
		System.out.println("qwqwqwqwq");
		System.out.println("date: "+date);
		System.out.println("exercise_category: "+exercise_category);
		System.out.println("exercise_time: "+exercise_time);
		System.out.println("food_category: "+food_category);
		System.out.println("food_amount: "+food_amount);
		
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
                    String cal=fileService.getExeTotalCal(exercise_category, exercise_time);
                    exerciseRecord.setCal(cal);
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
                	String cal=fileService.getFoodTotalCal(food_category, food_amount);
                	foodRecord.setCal(cal);
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
	
	@RequestMapping(value = "/loadUserRecord")
	public @ResponseBody Map<String, Object> getRecord() throws Exception {
		Subject subject = SecurityUtils.getSubject();
        String userId = subject.getPrincipal().toString();
        Map<String, Object> responseMap = new HashMap<>();
        if (userId != null && !"".equals(userId)) {
        	List<ExerciseRecord> exeList = fileService.findExeFilesByUserId(userId);
        	List<FoodRecord> foodList = fileService.findFoodFilesByUserId(userId);
			// 组织回复数据
			responseMap.put("resultMessage", new ResultMessage(1));
			
			responseMap.put("exeList", exeList);
			responseMap.put("foodList", foodList);
        }
        else {
            // 用户未登录数据
            responseMap.put("resultMessage", new ResultMessage(-2));
        }
        return responseMap;
	}

	
	
	
	@RequestMapping(value = "/updateRecord")
    public @ResponseBody ResultMessage updateRecord(String recordId, String date, String exercise_category, String exercise_time, String food_category, String food_amount) throws Exception{
		Subject subject = SecurityUtils.getSubject();
		String userId = subject.getPrincipal().toString();
		 int EXESUCCESS=1,FOODSUCCESS=1;
		  if (userId != null && !"".equals(userId)) {
			  
			boolean a = fileService.deleteExeFilesByDate(date);
			boolean b = fileService.deleteFoodFilesByDate(date);
			  if(a&&b) {
				  // 组织回复数据
	        	    
	        	   ExerciseRecord exerciseRecord = new ExerciseRecord();
	        	   exerciseRecord.setUserID(userId);
	        	   exerciseRecord.setDate(date);
	        	   exerciseRecord.setExercise_category(exercise_category);
	        	   exerciseRecord.setExercise_time(exercise_time);
	        	   String cal=fileService.getExeTotalCal(exercise_category, exercise_time);
	        	   System.out.println("cal:"+cal);
	        	   exerciseRecord.setCal(cal);
	        	   
	        	   FoodRecord foodRecord = new FoodRecord();
	        	   foodRecord.setUserID(userId);
	        	   foodRecord.setDate(date);
	        	   foodRecord.setFood_category(food_category);
	        	   foodRecord.setFood_weight(food_amount);
	        	   String call=fileService.getFoodTotalCal(food_category, food_amount);
	        	   System.out.println("call:"+call);
	        	   foodRecord.setCal(call);
	        	   if(!fileService.createExeRec(exerciseRecord)){
                   	EXESUCCESS=0;
                   }
	        	   if(!fileService.createFoodRec(foodRecord)){
	        		   FOODSUCCESS=0;
	                   }
	        	
	        	   if(EXESUCCESS==1&&FOODSUCCESS==1){
	               	return new ResultMessage(1);
	               }
	               else if(EXESUCCESS==0&&FOODSUCCESS==1)
	            	   return new ResultMessage(-15);
	               else if(EXESUCCESS==1&&FOODSUCCESS==0)
	               	return new ResultMessage(-16);
	               else
	               	return new ResultMessage(-17);
	            
	           
	}
		  }
		return new ResultMessage(-2);
	}
	
	
	

	@RequestMapping(value = "/deleteRecord")
	public @ResponseBody Map<String, Object> deleteRecord(String date) throws Exception {
		System.out.println("date!!!!: "+date);
		Subject subject = SecurityUtils.getSubject();
        String userId = subject.getPrincipal().toString();
        Map<String, Object> responseMap = new HashMap<>();
        if (userId != null && !"".equals(userId)) {
        	boolean exeResult = fileService.deleteExeFilesByDate(date);
        	boolean foodResult = fileService.deleteFoodFilesByDate(date);
			// 组织回复数据
			responseMap.put("resultMessage", new ResultMessage(1));
			responseMap.put("exeResult", exeResult);
			responseMap.put("foodResult", foodResult);
        }
        else {
            // 用户未登录数据
            responseMap.put("resultMessage", new ResultMessage(-2));
        }
        return responseMap;
	}

}
