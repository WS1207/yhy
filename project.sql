-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-14 11:35:45
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `add` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`id`, `phone`, `email`, `add`) VALUES
(1, 'dsdbgbfg', 'sdsvfvfvf', '');

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '密码',
  `hash` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '加密',
  `ps` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `user`, `password`, `hash`, `ps`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '271f7fcb664f8838c3382c92a86e9ff4', '123456');

-- --------------------------------------------------------

--
-- 表的结构 `culture_article`
--

CREATE TABLE IF NOT EXISTS `culture_article` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '标题',
  `content` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `url` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `culture_article`
--

INSERT INTO `culture_article` (`id`, `title`, `content`, `url`) VALUES
(1, 'dc', 'xss', '');

-- --------------------------------------------------------

--
-- 表的结构 `culture_cate`
--

CREATE TABLE IF NOT EXISTS `culture_cate` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title_url` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `culture_cate`
--

INSERT INTO `culture_cate` (`id`, `title_url`) VALUES
(2, '');

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `message`
--

INSERT INTO `message` (`id`, `name`, `phone`, `email`, `content`) VALUES
(4, 'csdc', 'sdcsdcsd', 'csdscsdc', '<h1>hello world</h1>'),
(5, 'rgerg', 'ewrgewrg', 'wergwerg', '<h1>hello worldewrgwergerg</h1>');

-- --------------------------------------------------------

--
-- 表的结构 `papercut`
--

CREATE TABLE IF NOT EXISTS `papercut` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '路径',
  `rec` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '推荐位',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- 转存表中的数据 `papercut`
--

INSERT INTO `papercut` (`id`, `title`, `content`, `url`, `rec`) VALUES
(12, 'sdfsdf', 'sss', '', ''),
(16, 'sssssa', 'aa', '', ''),
(17, 'aa', 'aa', '', '');

-- --------------------------------------------------------

--
-- 表的结构 `show`
--

CREATE TABLE IF NOT EXISTS `show` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `con` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `rec` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `view`
--

CREATE TABLE IF NOT EXISTS `view` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `video` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `view`
--

INSERT INTO `view` (`id`, `img`, `video`) VALUES
(4, '', 'asasas');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
