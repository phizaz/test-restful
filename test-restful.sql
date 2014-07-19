-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 19, 2014 at 09:34 AM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test-restful`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci AUTO_INCREMENT=76 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `title`, `created_at`, `updated_at`) VALUES
(71, 34, 'aoeu', '2014-07-19 07:19:11', '2014-07-19 07:19:11'),
(72, 34, 'aoe', '2014-07-19 07:19:11', '2014-07-19 07:19:11'),
(73, 34, 'ua', '2014-07-19 07:19:11', '2014-07-19 07:19:11'),
(74, 34, 'oeu', '2014-07-19 07:19:12', '2014-07-19 07:19:12'),
(75, 35, 'ฟหกดฟหกดฟ', '2014-07-19 07:34:14', '2014-07-19 07:34:14');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci AUTO_INCREMENT=42 ;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `created_at`, `updated_at`) VALUES
(34, 'aeou', '2014-07-16 15:59:13', '2014-07-16 15:59:13'),
(35, 'aoeuao', '2014-07-19 07:19:13', '2014-07-19 07:19:13'),
(36, 'eua', '2014-07-19 07:19:13', '2014-07-19 07:19:13'),
(37, 'oeu', '2014-07-19 07:19:13', '2014-07-19 07:19:13'),
(38, 'ao', '2014-07-19 07:19:13', '2014-07-19 07:19:13'),
(39, 'eu', '2014-07-19 07:19:13', '2014-07-19 07:19:13'),
(40, 'aoe', '2014-07-19 07:19:13', '2014-07-19 07:19:13'),
(41, 'ua', '2014-07-19 07:19:13', '2014-07-19 07:19:13');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
