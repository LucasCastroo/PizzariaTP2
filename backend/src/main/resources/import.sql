INSERT INTO Usuario (cpf, email, nascimento, nome, senha)
VALUES
    ('123.456.789-00', 'joao.silva@email.com', '1990-05-15', 'João da Silva', 'q+D+cDAwxEy2a3n2y7I9Sf5DT3ZgV+MYgvPEcoZVe3MsbN2MtxsoRvjvLz5pKTQQDZN0QGhCDkkS0eJLRa06/w=='),            -- senha001
    ('987.654.321-00', 'maria.oliveira@email.com', '1985-09-22', 'Maria Oliveira', 'iNRuQR7wu06aIXBBG75G1hLuq+7rxfgqyZMrC74XPfsQM/lyKb49TZQ+U7IVO67oQUsR6BuTN2nukBG0kR41hg=='),       -- senha002
    ('111.222.333-44', 'pedro.santos@email.com', '1978-03-10', 'Pedro Santos', 'peei/QAgQ3M9+x6SVNktDpmI5IfOpu9NVSbFzng7pYJJDBXeQpp90v05In4nIcgSmyCXuQbbrcZkGTfRpCrkug=='),           -- senha003
    ('444.555.666-77', 'ana.pereira@email.com', '1982-11-28', 'Ana Pereira', 'AeKu9/YgvXRAuWQwH9MLOVkKGzJfuHGT1QwYfTlBc8O85rbDAqsHgI0FaIPRf0gc3qowJzEi87+X8PSFXzBYSA=='),             -- senha004
    ('777.888.999-00', 'lucas.costa@email.com', '1995-07-19', 'Lucas Costa', 'EM+jvGuU03VpGk6SG1+9RRUkdJ2+qeBjMNJy605KZ+NFCaLtXZaBDHxxWAcw3FOruqy3vm26fC3NDYSUsT8afA=='),             -- senha005
    ('222.333.444-55', 'mariana.souza@email.com', '1972-01-03', 'Mariana Souza', 'Rk+ivvXH+HIM7urg0CGPtQPxnjZKklOO7h9vjmyySB0BIeI5zb4Fe9gLTFbaQkOsPMF8bcFShgmFO3m1srMyWA=='),         -- senha006
    ('666.777.888-99', 'rafaela.oliveira@email.com', '1988-08-12', 'Rafaela Oliveira', 'OkeG9VHPGw6fwZ7wDNM7cyqccVd9NJMNbN9XRRmrZ5Gdr9/bMRW5acoQ2sVx/Hf7PzXdFoRYbuRoaJnx36EJeA=='),   -- senha007
    ('999.000.111-22', 'fernando.santos@email.com', '1998-04-25', 'Fernando Santos', '9yPWeH7sJnThq9W+JaeUOmPVYcBMEMaqsPk5z8qJWA3dSWGxp9qOi5iW4OSttKT/A8j5r0biaXeAdh3ooQfrNg=='),     -- senha008
    ('333.444.555-66', 'carla.silva@email.com', '1980-06-30', 'Carla Silva', 'as/fRQszzfpnpBUhtW/08YpktTt8BO2G6nvgVXojQ6FDOsLSI+uHfJY87kAmc0hkllo0ASLeZuLf6dvKcfPM9Q=='),             -- senha009
    ('555.666.777-88', 'paulo.pereira@email.com', '1975-10-17', 'Paulo Pereira', 'LiQ+yqmq8o2TpUUc9HjvePYzYSG2cnK4veVHOjw9MYjr+RYI4A7NsOV5eNM3+vcyKg1kgE43abrXTlGzkb2nVw==');        -- senha010


INSERT INTO Cliente (id_usuario, telefone)
VALUES
    (1, '(11) 1234-5678'),
    (2, '(22) 9876-5432'),
    (3, '(33) 5555-5555'),
    (5, '(44) 7777-7777'),
    (6, '(55) 2222-2222');


INSERT INTO Cupom (codigo, desconto)
VALUES
    ('CUPOM01', 10.0),
    ('CUPOM02', 15.5),
    ('CUPOM03', 20.0),
    ('CUPOM04', 12.75),
    ('CUPOM05', 8.0);

INSERT INTO Endereco (bairro, cep, cidade, logradouro)
VALUES
    ('Centro', '12345-678', 'Cidade A', 'Rua Principal, 123'),
    ('Bairro 1', '98765-432', 'Cidade B', 'Avenida Secundária, 456'),
    ('Bairro 2', '54321-987', 'Cidade C', 'Travessa da Esquina, 789'),
    ('Bairro 3', '13579-246', 'Cidade D', 'Rua das Flores, 101'),
    ('Bairro 4', '87654-321', 'Cidade E', 'Avenida das Árvores, 222');

INSERT INTO Cliente_Endereco (id_cliente, id_endereco)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

INSERT INTO Funcionario (id_usuario, tipoAcesso)
VALUES
    (6, 'GERENTE'),
    (7, 'SUPERVISOR'),
    (8, 'ATENDENTE'),
    (9, 'GERENTE'),
    (10, 'ADMIN');

INSERT INTO Produto (tipo, descricao, kCal, nome, preco, ml, ingredientes, tamanhoPizza, tempoDePreparo)
VALUES ('PIZZA', 'Pizza de Calabresa', 1200, 'Pizza Calabresa', 25.50, null, 'Calabresa, queijo, molho de tomate', 'MEDIA', 20),
       ('BEBIDA', 'Refrigerante de Limão', 180, 'Sprite', 4.50, 350, null, null, null),
       ('BEBIDA', 'Refrigerante de Cola', 200, 'Coca-Cola', 5.50, 1000, null, null, null),
       ('PIZZA', 'Pizza de Frango', 1300, 'Pizza Frango', 23.75, null, 'Frango, queijo, molho de tomate', 'PEQUENA', 18),
       ('PIZZA', 'Pizza de Margherita', 1100, 'Pizza Margherita', 22.00, null, 'Queijo, molho de tomate, manjericão', 'GRANDE', 25);

INSERT INTO EnderecoPedido (id_endereco, bairro, cep, cidade, logradouro)
VALUES (1, 'Centro', '12345-678', 'Cidade A', 'Rua Principal, 123'),
       (2, 'Bairro 1', '98765-432', 'Cidade B', 'Avenida Secundária, 456'),
       (3, 'Bairro 2', '54321-987', 'Cidade C', 'Travessa da Esquina, 789'),
       (4, 'Bairro 3', '13579-246', 'Cidade D', 'Rua das Flores, 101'),
       (5, 'Bairro 4', '87654-321', 'Cidade E', 'Avenida das Árvores, 222');

INSERT INTO Pedido (formaPagamento, id_cliente, id_cupom, id_endereco)
VALUES
    ('CARTAO', 1, 1, 1),
    ('DINHEIRO', 2, NULL, 2),
    ('PIX', 3, NULL, 3),
    ('CARTAO', 4, 2, 4),
    ('DINHEIRO', 5, NULL, 5);


INSERT INTO StatusPedido (horario, status, id_pedido)
VALUES
    ('2023-10-01 10:16:00', 'AGUARDANDO_PAGAMENTO', 1),
    ('2023-10-01 11:30:00', 'EM_PREPARO', 1),
    ('2023-10-01 15:45:00', 'EM_ENTREGA', 1),
    ('2023-10-02 14:21:00', 'AGUARDANDO_PAGAMENTO', 2),
    ('2023-10-02 16:00:00', 'CANCELADO', 2),
    ('2023-10-03 08:31:00', 'AGUARDANDO_PAGAMENTO', 3),
    ('2023-10-03 12:45:00', 'EM_PREPARO', 3),
    ('2023-10-03 16:20:00', 'EM_ENTREGA', 3),
    ('2023-10-03 20:10:00', 'ENTREGUE', 3),
    ('2023-10-04 16:46:00', 'AGUARDANDO_PAGAMENTO', 4),
    ('2023-10-04 18:15:00', 'EM_PREPARO', 4),
    ('2023-10-04 22:30:00', 'EM_ENTREGA', 4),
    ('2023-10-05 09:40:00', 'ENTREGUE', 4),
    ('2023-10-05 12:11:00', 'AGUARDANDO_PAGAMENTO', 5),
    ('2023-10-05 14:30:00', 'CANCELADO', 5);

INSERT INTO ProdutoPedido (preco, quant, id_produto, id_pedido, tamanho)
VALUES (25.50, 2, 1, 1, 'MEDIA'),
       (25.50, 1, 2, 2, '350ML'),
       (25.50, 1, 3, 2, '1000ML'),
       (25.50, 1, 4, 2, 'PEQUENA'),
       (25.50, 4, 2, 3, '350ML'),
       (25.50, 5, 3, 4, '1000ML'),
       (25.50, 9, 4, 5, 'PEQUENA');