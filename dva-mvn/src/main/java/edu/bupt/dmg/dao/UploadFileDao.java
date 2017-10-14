package edu.bupt.dmg.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import edu.bupt.dmg.domain.UploadFile;
import edu.bupt.dmg.formbean.FileVo;
/**
 * 文件的数据接入层接口
 * 
 * Project Name: VisAna<br> 
 * File Name: UploadFileDao.java<br> 
 * Package Name: edu.bupt.dmg.dao<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public interface UploadFileDao extends Dao<UploadFile> {
	/**
	 * 查找某用户上传的所有文件在数据库表中的记录
	 * @param userId 用户id
	 * @return 文件值对象列表
	 */
	public List<FileVo> findByUserId(String userId);
	public List<FileVo> findNameByCondition(@Param("input")String input);
	public List<FileVo> findByFileNameAndUserId(UploadFile file);
}
