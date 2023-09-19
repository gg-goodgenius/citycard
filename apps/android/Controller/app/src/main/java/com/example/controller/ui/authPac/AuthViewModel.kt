package com.example.controller.ui.authPac

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.controller.localbase.PathsRepository
import com.example.controller.network.AuthRequestDto
import com.example.controller.network.AuthResponseDto
import com.example.controller.network.MainApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response

class AuthViewModel(val pathsRepository: PathsRepository): ViewModel() {

    suspend fun authPost(authRequestDto: AuthRequestDto): Response<AuthResponseDto> {
            return pathsRepository.authPost(authRequestDto)

    }

}