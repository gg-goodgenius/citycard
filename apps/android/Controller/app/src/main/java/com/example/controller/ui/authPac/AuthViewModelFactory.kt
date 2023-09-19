package com.example.controller.ui.authPac

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.controller.localbase.PathsRepository
import com.example.controller.ui.workShiftPac.WorkShiftViewModel


class AuthViewModelFactory( private val pathsRepository: PathsRepository
): ViewModelProvider.NewInstanceFactory() {
    override fun <T: ViewModel> create(modelClass:Class<T>): T {
        return AuthViewModel(pathsRepository) as T
    }
}