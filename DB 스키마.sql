/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- phisingblock 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `phisingblock` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */;
USE `phisingblock`;

-- 테이블 phisingblock.category 구조 내보내기
CREATE TABLE IF NOT EXISTS `category` (
  `pk` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`pk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

-- 테이블 데이터 phisingblock.category:~3 rows (대략적) 내보내기
INSERT INTO `category` (`pk`, `name`) VALUES
	(1, 'sample');

-- 테이블 phisingblock.messages 구조 내보내기
CREATE TABLE IF NOT EXISTS `messages` (
  `pk` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `is_contain_url` tinyint(4) NOT NULL,
  `is_contain_number` tinyint(4) NOT NULL,
  `sender` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`pk`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

-- 테이블 데이터 phisingblock.messages:~47 rows (대략적) 내보내기
INSERT INTO `messages` (`pk`, `content`, `is_contain_url`, `is_contain_number`, `sender`, `category`, `create_at`) VALUES
	(1, '[무슨통운] 고객님 택배 배송 불가주소 배송불가 즉시 주소 변경부탁드립니다.[dsv.munjsiks.top/goolm ]', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(2, '[Web발신][주문제품 취소처리건]주문접수건은 판매자 취소처리가 불가하여 고객님께서 직접 취소 처리부탁드립니다. http://phishing.com', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(3, '[배송조회] 9/9 고객주소가 잘못되었습니다 택배가 반송되었습니다 배송 주소 수정 http://www.qwer.me/FgMRD7', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(4, '(롯데택배) 추석배송 물량증가로배송이 지연되고 있습니다.배송일정 확인하세요http://nene.you/Nkln8', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(5, '[생활불편신고] 귀하에게 민원이 접수되어 통보드립니다.민원확인 http://bitly/2Hh9vp9', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(6, '[도로공사] 박준한님차량불법단속대상 적발! 확인 후 빠른처리 요망! http365.com', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(7, '☞(^0^)~★ 추석 잘 보내시고2019년 남은 시간 모두 모두행복하세요 ^.~http//www.dfsdf.qwer', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(8, '조성윤님 추석명절 선물로 모바일 상품권을 보내드립니다 확인 바랍니다.http://hpbl.are/nbaBl', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(9, '추석선물 도착 전 상품 무료배송! 할인쿠폰 지급완료!즉시 사용가능!확인 http://vno.kr/nengbH', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(10, '추석에 찾아뵈어야 하는데 영상으로라도 인사드립니다.즐거운 한가위 보내세요!http://mnon.it/Pnti1', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(11, '상품이 배송되었습니다. 자세한 내용을 보려면 아래 URL을 클릭하세요. https://www.jokki.look', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(12, '[Web발신]][CJ대한통운] 등기소포 배송불가(주소불명)주소지확인 http://jeon.lloyd.com', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(13, '[택배알림]추석 선물 택배 배송지 오류, 변경 요망hittp://dmsw.tLm2xzik/', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(14, '추석 선물/모바일상품권 도착! ▼14번호입력하기(클릭)▼ http://click.no.no/phishing!', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(15, '[Web발신][교통민원24]법규위반 과속운전 확인 http://ljxk.cbm.ig/nope', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(16, '[추석 맞이] 민생회복 지원금 지원 대상 여부 확인하기↓ http://phishing.don’t.click/', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(17, '한가위이벤트에 당첨되어 선물을 보내드립니다. 당첨된선물 즉시 확인해보세요.http://fallev.net/99ujh', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(18, '주석연휴 소소하지만 가족과함께 드실 수 있는 모바일 쿠폰을 보내드렸습니다.http://HJK75.com/bkjkhg', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(19, '추석명절 선물로 모바일 상품권을 보내드립니다지금 바로 확인 바랍니다. http://786hbuik.com/87', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(20, '[Web발신]][CJ대한통운] 등기소포 배송불가(주소불명)주소지확인 https://goo.gl/gBfkXn', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(21, '☞(^0^)~★☜추석 잘 보내시고 2018년 남은시간 모두모두 행복하십시요..^.~http://woz.kr/mhgd', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(22, '청첩장이 도착하였습니다 많은참석 부탁드립니다http://ti.or/uxyg', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(23, '[도로공사] 홍길동님 차량단속대상 적발 htt999.com 확인후 빠른처리 요망', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(24, '사랑하는 모친께서 별세하셨으므로 삼가 알려드립니다 장례식장 https://t.Iy/iEtos', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(25, '"롯데리아"한우불고기세트 사용쿠폰 2매 http://tiny.cc/gool', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(26, '모바일 돌찬치초대장을 보내드렸습니다.참석하여 주시기 바랍니다. http://balca.er/vervvr', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(27, '[한진택배]택배배송불가 *주소*불완전함즉시변경부탁드립니다:<http://nfgh.net/1rq34r2>', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(28, '신호진님 명절 선물로 모바일 상품권을 보내드립니다 확인 바랍니다. http/pblare/nbaBl', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(29, '[보건복지부 지원금 신청 안내]귀하는 국민지원금 신청대상자에 해당되므로 온라인 센터 (http://www.sdrh.gov/23r)에서 지원하시기 바랍니다.', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(30, '[Web발신][긴급재난지원금] 신용,체크카드 긴급재나지원금 모바일로 간단하게 신정하세요 http://noewm.club/covid-19', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(31, '전염병 발생 마스크 무료로받아가세요.http://sxxxs.xyz/?qhogcd', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(32, '코로나19확진자150명발생환자이동경로는역학조사후확인 http://mxxxt.xyz/ldxxdz', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(33, '[긴급재난자금] 상품권이 도착했읍니다. 확인해주세요.https://bit.ly/3x0Mel', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(34, '7월추가 코로나19재난지원금 wwwcoroona-19.net신청.', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(35, '[배송조회] 9/9 고객주소가잘못되었습니다 택배가 반송되었습니다 배송 주소 수정 uuuu.me/FgMRD7', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(36, '[롯데택배] 추석배송 물량증가로배송이 지연되고 있습니다.배송일정 확인하세요 http://nene.tou/rthslikjg', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(37, '[생활불편신고] 귀하에게민원이 접수되어 통보드립니다.민원확인http://bitly/2Hh9vp9', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(38, '[국제발신] 스미스님 해외인증 4148 USD570$ 결제완료 본인 아닌경우 한국 소비자원 신고 문의:031-952-0786', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(39, '[국제발신] 이원도님 amazon 해외인증:70** USD390$ 구매 본인아닐 경우 소비자보호센터 문의:03137169U26', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(40, 'KB국민카드 05/30 카드대금 978,650원 정상처리 완료 귀하의사용이 아닐 경우 취소요청 바랍니다(1566-1740)방금 수신한 문자메시지는 해외에서 발송되었습니다.', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(41, '[Web발신][*경찰청교통]도로위반 보고서(발송)내용확인 http://plz.fu6k.art', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(42, '[Web발신]지금오시면 이사비지원! 방문도메인 tcc2024.**m', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(43, '[Web발신] 고객님의 인증번호는 9191입니다. 로그인후 money는 고객센터문의~ http://ukk2024.com/', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(44, '[Web발신]고객님의 인증번호는 1819 입니다.http://dmm2024.com/', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(45, '엄마나 이거 주원이 폰인데나급하게80만원이 필요한데좀 보내줘', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(46, '고객님[관세징수과]입니다.미납관세 863,589원 장기미납되었습니다.법적 강제조치예정<민원센터:1551-4076>', 1, 0, '01000000000', 1, '2024-06-25 15:22:52'),
	(47, '[국제발신]고객님[관세청]입니다.해외수입물품중[반입금지품목]확인! 법적제재 대상이오니본인 확인시 문의바랍니다1833-3268', 1, 0, '01000000000', 1, '2024-06-25 15:22:52');

-- 테이블 phisingblock.phone_dialogs 구조 내보내기
CREATE TABLE IF NOT EXISTS `phone_dialogs` (
  `pk` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `is_global` tinyint(4) NOT NULL,
  `is_require_money` tinyint(4) NOT NULL,
  `is_keep_alive` tinyint(4) NOT NULL,
  `is_require_download` tinyint(4) NOT NULL,
  `sender` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`pk`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

-- 테이블 데이터 phisingblock.phone_dialogs:~0 rows (대략적) 내보내기

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
