package com.example.controller.ui.authPac

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import com.example.controller.App
import com.example.controller.MainActivity
import com.example.controller.databinding.ActivityAuthBinding
import com.example.controller.databinding.ActivityMainBinding
import com.example.controller.network.AuthRequestDto
import com.example.controller.network.AuthResponseDto
import com.example.controller.ui.workShiftPac.WorkShiftViewModel
import com.example.controller.ui.workShiftPac.WorkShiftViewModelFactory
import com.example.controller.ui.workShiftPac.workShiftStarted.WorkShiftStartedViewModel
import com.example.controller.ui.workShiftPac.workShiftStarted.WorkShiftStartedViewModelFactory
import com.google.android.gms.tasks.Tasks.await
import com.google.gson.annotations.SerializedName
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class AuthActivity : AppCompatActivity() {


    private var _binding: ActivityAuthBinding? = null
    private val binding get() = _binding!!


    val viewModel: AuthViewModel by viewModels { AuthViewModelFactory((application as App).pathsRepository) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)

        with(binding) {
            btContinuation.setOnClickListener {
                lifecycleScope.launch {/*
                      val authResponseDto = viewModel.authPost(
                          AuthRequestDto(
                              etEmail.text.toString(),
                              etPass.text.toString()
                          )
                      )*/
                    delay(5000L)

                    //add token
                }
                    //check good response
                val i=Intent(this@AuthActivity,MainActivity::class.java)
                startActivity(i)
                overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
                finish()
            }
        }


    }
}