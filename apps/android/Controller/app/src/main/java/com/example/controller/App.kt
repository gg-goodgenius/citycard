package com.example.controller

import android.app.Application
import android.os.StrictMode
import android.util.Log
import androidx.datastore.DataStore
import androidx.datastore.preferences.Preferences
import androidx.datastore.preferences.createDataStore
import com.example.controller.localbase.MainDB
import com.example.controller.localbase.CardsRepository
import com.example.controller.localbase.PassPhrase
import com.example.controller.localbase.PathsRepository
import com.example.controller.network.MainApi
import com.google.android.datatransport.runtime.BuildConfig
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import net.sqlcipher.database.SupportFactory
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


const val TAG = "AppClass"

class App : Application() {

    val retrofit by lazy {
        Retrofit.Builder().client(client).baseUrl("https://api.op.citycard.goodgenius.ru/")
            .addConverterFactory(GsonConverterFactory.create()).build()
    }
    val api by lazy{retrofit.create(MainApi::class.java)}


    val client: OkHttpClient = OkHttpClient.Builder().addInterceptor(Interceptor { chain ->
        val newRequest: Request = chain.request().newBuilder()
            //.addHeader("Authorization", "Bearer subescheator")
            .build()
        chain.proceed(newRequest)
    }).build()


    var prefDataStore = createDataStore(
        name = "work_data_store",
        corruptionHandler = null,
        migrations = emptyList(),
        scope = CoroutineScope(Dispatchers.IO + Job())
    )

    private val cardsDatabase by lazy {
        MainDB.getDatabase(
            applicationContext, SupportFactory(
                PassPhrase(applicationContext).getPassphrase()
            )
        )
    }


    val cardsRepository by lazy {
        CardsRepository(cardsDatabase.getDao())
    }.also { Log.d(TAG, " again!") }

    val pathsRepository by lazy {
        PathsRepository(cardsDatabase.getDao(), api)
    }.also { Log.d(TAG, " again!") }

    override fun onCreate() {
        if (BuildConfig.DEBUG) {
            StrictMode.setThreadPolicy(
                StrictMode.ThreadPolicy.Builder()
                    .detectAll()
                    .penaltyLog()
                    .build()
            )
            StrictMode.setVmPolicy(
                StrictMode.VmPolicy.Builder()
                    .detectAll()
                    .penaltyLog()
                    .build()
            )
        }

        super.onCreate()
    }


}