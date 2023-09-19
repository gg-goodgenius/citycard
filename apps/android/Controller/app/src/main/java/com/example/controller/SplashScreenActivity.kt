package com.example.controller

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.controller.databinding.ActivitySplashScreenBinding
import com.example.controller.ui.authPac.AuthActivity


class SplashScreenActivity : AppCompatActivity() {

    private var _binding: ActivitySplashScreenBinding? = null
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivitySplashScreenBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.ivLogo.alpha = 0f
        binding.ivLogo.animate().setDuration(1500).alpha(1f).withEndAction {
            val i = Intent(this, AuthActivity::class.java)
            startActivity(i)
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
            finish()
        }
    }


}