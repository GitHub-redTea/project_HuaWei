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
	$uesrname = $_POST['uesrname'];
	$password = $_POST['password'];
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
	mysql_select_db('accounthtml');

	//开始插入数据
	//4、通过sql语句进行插入数据
	$sql = "INSERT INTO account VALUES('$uesrname','$password')";
	//5、把sql语句发送给dbms，执行得到结果
	$is_ok = mysql_query($sql);
	if($is_ok){
		echo 'echo';
	}else{
		echo 'false';
	}

 ?>