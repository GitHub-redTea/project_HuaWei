<?php 
	//接受提交上来的数据
	header('content-type:text/html;charset="utf-8"');
	//1、接受用户提交的学生信息
	//【注】$_POST 包含了表单通过POST提交上来的所有数据
	//echo 相当于JS中的document.write()
	//print_r 相当于JS中的console.log
	/*echo '<pre>';
	print_r($_POST);*/
	//将提交上来的数据取出来
	$stuId = $_POST['stuId'];
	$stuName = $_POST['stuName'];
	$stuMath = $_POST['stuMath'];
	$stuEnglish = $_POST['stuEnglish'];
	$stuChinese = $_POST['stuChinese'];
	//print_r($stuName);

	//2、链接数据库(mysql)
	/*
		mysql_connect('localhost', 'root', '123456');
		第一个参数表示:数据库所在的主机地址
		第二个参数表示:数据的用户名
		第三个参数表示:密码
		返回值: 是布尔值 true链接成功 false 链接失败
	*/
	$con = mysql_connect('localhost', 'root', '123456');
	if(!$con){
		echo 'error';
		//退出程序
		exit;
	}else{
		echo 'success';
	}

	//3、选择数据库
	mysql_select_db('qd1701_db');

	//开始插入数据
	//4、通过sql语句进行插入数据
	$sql = "INSERT INTO student VALUES($stuId,'$stuName',$stuChinese,$stuEnglish,$stuMath)";
	//5、把sql语句发送给dbms，执行得到结果
	$is_ok = mysql_query($sql);
	if($is_ok){
		echo '恭喜你添加成功';
	}else{
		echo '添加失败';
	}

 ?>