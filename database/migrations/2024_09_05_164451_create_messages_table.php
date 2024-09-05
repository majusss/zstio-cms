<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('message')->nullable();
            $table->boolean('published');
            $table->enum('type', ['INFO', 'UPDATE', 'WARNING', 'ERROR', 'SILENT']);
            $table->enum('displayType', ['POPUP', 'BANNER']);
            $table->string('toUrl')->nullable();
            $table->string('redirectUrl')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
