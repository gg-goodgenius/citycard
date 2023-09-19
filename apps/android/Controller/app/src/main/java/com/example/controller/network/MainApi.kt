package com.example.controller.network

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import java.util.UUID


interface MainApi {
    /* @GET("list")
     suspend fun getServerResponse(): TodoListResponseDto

     @PUT("list/{id}")
     suspend fun editTodoItemToInternet(
         @Header("X-Last-Known-Revision") revision: Int,
         @Path("id") id: UUID,
         @Body body: TodoItemRequestDto
     ): Response<TodoItemResponseDto>

     @DELETE("list/{id}")
     suspend fun deleteTodoItem(
         @Header("X-Last-Known-Revision") revision: Int,
         @Path("id") id: UUID
     ): Response<TodoItemResponseDto>

     @GET("list")
     suspend fun downloadTodoList(): Response<TodoListResponseDto>

     @PATCH("list")
     suspend fun updateServerFromDb(@Header("X-Last-Known-Revision") revision: Int,
                                    @Body body: TodoListRequestDto
     ): Response<TodoListResponseDto>

     @POST("list")
     suspend fun loadTodoItem(@Header("X-Last-Known-Revision") revision: Int, @Body body:TodoItemRequestDto)
             : Response<TodoItemResponseDto>*/

    @FormUrlEncoded
    @POST("auth/signin")
    suspend fun authPost(
        @Header("Content-Type") name: String,
        @Field("username") username: String,
        @Field("password") password: String
    ): Response<AuthResponseDto>
}