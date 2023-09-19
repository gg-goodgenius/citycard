package com.example.controller.pathHistory.rvHist

import androidx.recyclerview.widget.DiffUtil
import com.example.controller.entities.CardHistory
import com.example.controller.entities.Path


class PathsHistDiffCallback : DiffUtil.ItemCallback<CardHistory>() {

    override fun areItemsTheSame(oldItem: CardHistory, newItem: CardHistory) =
        oldItem.id == newItem.id


    override fun areContentsTheSame(oldItem: CardHistory, newItem: CardHistory) =
        oldItem == newItem
}