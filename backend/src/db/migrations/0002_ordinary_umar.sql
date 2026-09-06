CREATE TABLE "saved_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "joint_session_agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"user_id" integer,
	"joined_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "joint_session_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"author_id" integer,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "joint_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"ticket_id" integer,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "email_integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"provider" text NOT NULL,
	"host" text NOT NULL,
	"port" integer NOT NULL,
	"login" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"received_today" integer DEFAULT 0,
	"sent_today" integer DEFAULT 0,
	"last_sync_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "joint_session_agents" ADD CONSTRAINT "joint_session_agents_session_id_joint_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."joint_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "joint_session_agents" ADD CONSTRAINT "joint_session_agents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "joint_session_messages" ADD CONSTRAINT "joint_session_messages_session_id_joint_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."joint_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "joint_session_messages" ADD CONSTRAINT "joint_session_messages_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "joint_sessions" ADD CONSTRAINT "joint_sessions_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;