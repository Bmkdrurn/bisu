-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 22 Eyl 2021, 22:58:09
-- Sunucu sürümü: 10.4.21-MariaDB
-- PHP Sürümü: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `bidb`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

CREATE TABLE `products` (
  `subscriptionId` int(50) NOT NULL,
  `fullname` varchar(55) NOT NULL,
  `address` varchar(255) NOT NULL,
  `locationName` varchar(55) NOT NULL,
  `subCityName` varchar(50) NOT NULL,
  `cityName` varchar(50) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `phoneNumber` decimal(10,0) NOT NULL,
  `distributorNumber` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `products`
--

INSERT INTO `products` (`subscriptionId`, `fullname`, `address`, `locationName`, `subCityName`, `cityName`, `brand`, `phoneNumber`, `distributorNumber`) VALUES
(1, 'Kadir Urun', 'yesil sok.No:91 D:2', 'Inonu mah', 'Atasehir', 'İstanbul', 'Tasdelen', '5526654565', '5526654566'),
(2, 'utku', 'sair nefi \r\nsokak', 'caferaga', 'İstanbul', 'kadıköy', 'hayat', '5551112223', '5551121212'),
(3, 'mehmet', 'sair nefi \r\nsokak', 'caferaga', 'istanbul', 'kadıköy', 'sırma', '5548594574', '5321489862'),
(4, 'ipek', 'yesil sokak', 'caferaga', 'İstanbul', 'kadıköy', 'erikli', '5448974521', '5667894123');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `suborders`
--

CREATE TABLE `suborders` (
  `orderId` int(50) NOT NULL,
  `subscriptionId` int(50) NOT NULL,
  `deliveryDate` datetime NOT NULL,
  `paymentMethod` varchar(20) NOT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`products`)),
  `totalAmount` float(10,2) NOT NULL,
  `status` set('NEW','COMPLETED','CONFIRMED','CANCELED') NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `suborders`
--

INSERT INTO `suborders` (`orderId`, `subscriptionId`, `deliveryDate`, `paymentMethod`, `products`, `totalAmount`, `status`) VALUES
(1, 432432, '2021-09-09 12:30:13', 'BKM', '[ {\"product\":\"19 lt damanaca\", \r\n\"quantity\":1 }]', 10.00, 'CONFIRMED'),
(2, 432432, '2021-09-22 11:33:45', 'BKM', '[ {\"product\":\"19 lt damanaca\", \r\n\"quantity\":1 }]', 10.00, 'NEW'),
(3, 32134, '2021-09-22 16:37:47', 'PAYATDOOR', ' [{\"product\":\"19 lt damanaca\", \r\n\"quantity\":3 } ]', 26.00, 'CANCELED');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`subscriptionId`);

--
-- Tablo için indeksler `suborders`
--
ALTER TABLE `suborders`
  ADD PRIMARY KEY (`orderId`);
ALTER TABLE `suborders` ADD FULLTEXT KEY `products` (`products`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `products`
--
ALTER TABLE `products`
  MODIFY `subscriptionId` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `suborders`
--
ALTER TABLE `suborders`
  MODIFY `orderId` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
