package com.example.PayMe;

import com.example.PayMe.entity.Transaction;
import com.example.PayMe.entity.Account;
import com.example.PayMe.repository.AccountRepository;
import com.example.PayMe.repository.TransactionRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PayMeApplicationTests {

	@Autowired
	private TransactionRepository transRepo;

	@Autowired
	private AccountRepository accountRepo;

	@Test
	void contextLoads() {
	}

	@Test
	public void testAddTransaction() {
		Transaction trans = new Transaction();
		trans.setTransactionAmount(5.60);
		Account recipient = accountRepo.save(new Account());
		Account payer = accountRepo.save(new Account());
		trans.setRecipient(recipient);
		trans.setPayer(payer);

		Transaction savedTrans = transRepo.save(trans);

		Assertions.assertThat(savedTrans).isNotNull();
		Assertions.assertThat(savedTrans.getTransactionID() != null);
	}
}
