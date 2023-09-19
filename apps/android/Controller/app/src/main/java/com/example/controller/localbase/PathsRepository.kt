package com.example.controller.localbase

import com.example.controller.entities.Path
import com.example.controller.entities.PathDataItem
import com.example.controller.entities.WorkShift
import com.example.controller.entities.WorkShiftDataItem
import com.example.controller.network.AuthRequestDto
import com.example.controller.network.AuthResponseDto
import com.example.controller.network.MainApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import retrofit2.Response

class PathsRepository(val dao: MainDao, val api: MainApi) {


    fun getAllPathsFlow(): Flow<List<Path>> {

        val list = dao.getAllPathsFlow()
        return list.map {
            it.map { uit ->
                fromPathDataItemToPath(uit)
            }
        }
    }


    //////
    suspend fun insertNewWorkShift(work: WorkShift) {
        withContext(Dispatchers.IO) {
            dao.insertNewWorkShift(fromWorkShiftToWorkShiftDataItem(work))
        }
    }

    suspend fun closeWorkShift(workShift: WorkShift?) {
        withContext(Dispatchers.IO) {
            dao.closeWorkShift(workShift?.let { fromWorkShiftToWorkShiftDataItem(it) })
        }
    }

    suspend fun getLastWork(): WorkShift? {

        return fromWorkShiftDataItemToWorkShift(dao.getLastWork())
    }

    suspend fun addNewPath(path: Path) {
        withContext(Dispatchers.IO) {
            dao.addNewPath(fromPathToPathDataItem(path))
        }
    }


    suspend fun authPost(authRequestDto: AuthRequestDto): Response<AuthResponseDto> {
        return api.authPost("application/x-www-form-urlencoded",authRequestDto.email,authRequestDto.password)
    }
}