
CREATE TABLE public.saved_labels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  labels JSONB NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_labels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.saved_labels FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.saved_labels FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON public.saved_labels FOR DELETE USING (true);
