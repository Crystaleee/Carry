package edu.bupt.dmg.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.bupt.dmg.adapter.FileAdapter;
import edu.bupt.dmg.dao.UploadFileDao;
import edu.bupt.dmg.domain.UploadFile;
import edu.bupt.dmg.domain.User;
import edu.bupt.dmg.formbean.FileVo;
import edu.bupt.dmg.formbean.Table;
import edu.bupt.dmg.service.FileService;

/**
 * 文件操作业务逻辑层实现
 * 
 * Project Name: VisAna<br>
 * File Name: FileServiceImpl.java<br>
 * Package Name: edu.bupt.dmg.service.impl<br>
 * Creator: @author Ruitong Chai & Bohao Wang<br>
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class FileServiceImpl implements FileService {
	@Autowired
	UploadFileDao uploadFileDao;

	@Autowired
	HashMap<String, FileAdapter> adapterMap;

	@Override
	public boolean storeFile(UploadFile uploadFile) {
		try {
			uploadFileDao.insert(uploadFile);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public List<FileVo> findFilesByUserId(String userId) {
		return uploadFileDao.findByUserId(userId);
	}

	@Override
	public List<FileVo> findNameByCondition(String input) {
		
		System.out.println("99999999999999999"+input);
		return uploadFileDao.findNameByCondition(input);
	}
	
	@Override
	public UploadFile findFileById(String fileId) {
		
		return uploadFileDao.findById(fileId);
	}

	@Override
	public boolean writeJsonFileToDisk(String jsonFile, String path, String fileName) {
		try {
			File file = new File(path);
			if(!file.exists()){
				file.mkdirs();
			}
			OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(path+File.separator+fileName),"UTF-8");
			out.write(jsonFile);
			out.flush();
			out.close();
			// FileWriter fileWriter = new
			// FileWriter(path+File.separator+fileName, false);
			// fileWriter.write(jsonFile);
			// fileWriter.flush();
			// fileWriter.close();
		} catch (IOException e) {
			return false;
		}
		return true;
	}
	
	@Override
	public  boolean isNumeric(String str){
        for(int i=str.length();--i>=0;){
            int chr=str.charAt(i);
            if(chr<48 || chr>57)
                return false;
        }
        return true;
    }
	
	   public boolean isDate(String testString){
	        String[] dateStringPartArray=testString.split("/");
	        if(dateStringPartArray.length==3){
	            if((isNumberString(dateStringPartArray[0])&&isNumberString(dateStringPartArray[1]))&&isNumberString(dateStringPartArray[2])){
	                if(dateStringPartArray[0].length()==4&&
	                   ((dateStringPartArray[1].length()<=2&&dateStringPartArray[1].length()>0)&&
	                   (dateStringPartArray[2].length()>0&&dateStringPartArray[2].length()<=2))){
	                    return true;
	                }
	                else{
	                    return false;
	                }
	            }
	            else{
	                return false;
	            }
	        }
	        else{
	            return false;
	        }
	    }
	@Override
	public boolean writeFileToDisk(MultipartFile file, String path, String fileName) {
		File targetFile = new File(path, fileName);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}
		try {
			file.transferTo(targetFile);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public ArrayList<Table> readFileFromDisk(String path) throws Exception {
		InputStream is = new FileInputStream(path);
		String extensions = path.substring(path.lastIndexOf(".") + 1, path.length());
		FileAdapter adapter = adapterMap.get(extensions);
		ArrayList<Table> tables = adapter.analizeTable(is);
		return tables;
	}

	@Override
	public boolean deleteFileByFileId(String fileId) {
		try {
			uploadFileDao.deleteById(fileId);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public void deleteFileOnDisk(String path) {
		File file = new File(path);
		if (file.exists()) {
			file.delete();
		}

	}

	@Override
	public boolean isFileNameNotRepeated(String fileName, String userId) {
		UploadFile uploadFile = new UploadFile();
		uploadFile.setFileName(fileName);
		User user = new User();
		user.setUserId(userId);
		uploadFile.setUser(user);
		if (uploadFileDao.findByFileNameAndUserId(uploadFile).isEmpty()) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean createJsonFile(Object jsonObject, UploadFile uploadFile, String realPath) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String jsonStr = objectMapper.writeValueAsString(jsonObject);
			File file = new File(realPath);
			FileOutputStream out = new FileOutputStream(file);
			OutputStreamWriter osw = new OutputStreamWriter(out, "UTF8");
			BufferedWriter bw = new BufferedWriter(osw);
			bw.write(jsonStr);
			bw.close();
			osw.close();
			out.close();
			uploadFileDao.insert(uploadFile);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	@Override
	public boolean isFloatString(String testString){
	    if(!testString.contains(".")){
	        return isNumberString(testString);
	    }
	    else{
	        String[] floatStringPartArray=testString.split("\\.");
	        if(floatStringPartArray.length==2){
	            if(isNumberString(floatStringPartArray[0])&&isNumberString(floatStringPartArray[1])){
	                return true;
	            }
	            else{
	                return false;
	            }
	        }
	        else{
	            return false;
	        }
	    }
	}
	
	@Override
	public  boolean isNumberString(String testString){
        String numAllString="0123456789";
        if(testString.length()<=0){
            return false;
        }
        else{
            for(int i=0;i<testString.length();i++){
                String charInString=testString.substring(i,i+1);
                if(!numAllString.contains(charInString)){
                    return false;
                }
            }
        }
        return true;
    }
	
	   public ArrayList splitFile(String s1,String s2){
	       ArrayList list=new ArrayList();
	       String[] aa=null;
	       if(s2.equals("*"))
	       {
	           aa=s1.split("\\*");
	       }
	       else if(s2.equals("+")){
	           aa=s1.split("\\+");
	       }
	       else if(s2.equals(".")){
	           aa=s1.split("\\.");
	       }
	       else if(s2.equals("|")){
	           aa=s1.split("\\|");
	       }
	       else if(s2.equals("\\")){
	           aa=s1.split("\\\\");
	       }
	       else{
	           aa=s1.split(s2);
	       }
	       for(int i=0;i<aa.length;i++){
	           list.add(aa[i]);
	       }
	       return list;
	   }

}

