package com.example.controller.pathHistory.rvHist

import androidx.recyclerview.widget.RecyclerView
import com.example.controller.databinding.ItemPastHistBinding
import com.example.controller.entities.CardHistory
import com.example.controller.entities.Path


class PathsHistViewHolder(val binding: ItemPastHistBinding) : RecyclerView.ViewHolder(binding.root) {
    fun onBind(item: CardHistory) {
        with(binding) {
           tvDate.text="сегодня"
            tvStatus.text=item.typeAction.toString()
            tvNumOfCard.text=item.cardId.toString()

        }
    }
}