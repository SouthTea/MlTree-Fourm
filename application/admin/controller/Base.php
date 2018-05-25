<?php
namespace app\admin\controller;

use think\Controller;
use think\Db;
use Auth\Auth;

class Base extends Controller
{

    protected function initialize()
    {
        $uid = session('uid');
        $user = Db::name('user')->where('uid',session('uid'))->find();
        $this->assign('userData',$user);

        $auth = new auth();
        if (empty($uid)) {
            return $this->error('无权限！',url('index/index/index'));
        }elseif (!$auth->check('admin',$uid)) {
            return $this->error('无权限！',url('index/index/index'));
        }
    }
}