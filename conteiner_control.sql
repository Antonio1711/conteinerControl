-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 31-Mar-2022 às 16:27
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `conteiner_control`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `conteiner`
--

CREATE TABLE `conteiner` (
  `cliente` varchar(50) NOT NULL,
  `num_conteiner` varchar(11) NOT NULL,
  `tipo_conteiner` enum('20','40') NOT NULL,
  `status` enum('cheio','vazio') NOT NULL,
  `categoria` enum('importacao','exportacao') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `conteiner`
--

INSERT INTO `conteiner` (`cliente`, `num_conteiner`, `tipo_conteiner`, `status`, `categoria`) VALUES
('Antonio', 'TEST1234567', '20', 'cheio', 'importacao'),
('Jose', 'TEST7654321', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `movimentacoes`
--

CREATE TABLE `movimentacoes` (
  `idMov` int(11) NOT NULL,
  `tipo_movimentacao` enum('embarque','descarga','gate_in','gate_out','reposicionamento','pesagem','scanner') NOT NULL,
  `datahora_inicio` datetime NOT NULL,
  `datahora_fim` datetime NOT NULL,
  `numconteiner_mov` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `movimentacoes`
--

INSERT INTO `movimentacoes` (`idMov`, `tipo_movimentacao`, `datahora_inicio`, `datahora_fim`, `numconteiner_mov`) VALUES
(1, 'embarque', '2022-03-17 11:16:59', '2022-03-28 07:34:55', 'TEST1234567'),
(2, 'descarga', '2022-03-02 09:30:23', '2022-03-28 11:34:55', 'TEST7654321');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `conteiner`
--
ALTER TABLE `conteiner`
  ADD PRIMARY KEY (`num_conteiner`);

--
-- Índices para tabela `movimentacoes`
--
ALTER TABLE `movimentacoes`
  ADD PRIMARY KEY (`idMov`),
  ADD KEY `movimentacoes_ibfk_1` (`numconteiner_mov`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `movimentacoes`
--
ALTER TABLE `movimentacoes`
  MODIFY `idMov` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `movimentacoes`
--
ALTER TABLE `movimentacoes`
  ADD CONSTRAINT `movimentacoes_ibfk_1` FOREIGN KEY (`numconteiner_mov`) REFERENCES `conteiner` (`num_conteiner`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
